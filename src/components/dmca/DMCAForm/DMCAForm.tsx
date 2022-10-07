import { FC, useState, ChangeEvent, useMemo, FormEvent } from 'react';
import axios from 'axios';

import styles from './DMCAForm.module.scss';

import { isBetween, isEmailValid } from './utils';
import { isEmpty } from '../../../utils/common.utils';
import sendMail from '../../../API/requests/dmca/sendMail';

// TODO разбить бы на компоненты для читаемости (Приоритет 2/10)

const DMCAForm: FC = () => {
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    text: '',
  });

  const [success, setSuccess] = useState({
    name: false,
    email: false,
    text: false,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  type Handler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;

  const handleChangeName: Handler = (e) => {
    setName(e.target.value);
    debouncedCheckName(e.target.value);
  };

  const handleChangeEmail: Handler = (e) => {
    setEmail(e.target.value);
    debouncedCheckEmail(e.target.value);
  };

  const handleChangeText: Handler = (e) => {
    setText(e.target.value);
    debouncedCheckText(e.target.value);
  };

  const debounce = (fn: Function, delay = 500) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
  };

  const debouncedCheckName = useMemo(() => {
    const checkName = (val: string) => {
      if (isEmpty(val)) {
        setSuccess({ ...success, name: false });
        setErrors({ ...errors, name: 'Name cannot be blank.' });
      } else {
        setSuccess({ ...success, name: true });
        setErrors({ ...errors, name: '' });
      }
    };

    return debounce(checkName);
  }, [errors, success]);

  const debouncedCheckEmail = useMemo(() => {
    const checkEmail = (val: string) => {
      setSuccess({ ...success, email: false });

      if (isEmpty(val)) {
        setErrors({ ...errors, email: 'Email cannot be blank.' });
      } else if (!isEmailValid(val)) {
        setErrors({ ...errors, email: 'Email is not valid.' });
      } else {
        setSuccess({ ...success, email: true });
        setErrors({ ...errors, email: '' });
      }
    };

    return debounce(checkEmail);
  }, [errors, success]);

  const debouncedCheckText = useMemo(() => {
    const checkText = (val: string) => {
      const min = 3;
      const max = 10000;
      setSuccess({ ...success, text: false });

      if (isEmpty(val)) {
        setErrors({ ...errors, text: 'Text cannot be blank.' });
      } else if (!isBetween(val.length, min, max)) {
        setErrors({
          ...errors,
          text: `Text must be between ${min} and ${max} characters.`,
        });
      } else {
        setSuccess({ ...success, text: true });
        setErrors({ ...errors, text: '' });
      }
    };

    return debounce(checkText);
  }, [errors, success]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNameValid = !errors.name && success.name;
    const isEmailValid = !errors.email && success.email;
    const isTextValid = !errors.text && success.text;

    const isFormValid = isNameValid && isEmailValid && isTextValid;

    try {
      if (isFormValid) {
        setIsButtonDisabled(true);

        await sendMail(name, email, text);

        setResult('Thank you! Your message has been sent');
      } else {
        setResult('Error while sending');
      }
    } catch (err) {
      setResult('Error while sending');
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>DMCA form</h1>

      <div className={styles.text}>
        You can get access to the Special Rights Account Panel after filling out this form.
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div
          className={`${styles.formItem} ${success.name ? styles.success : ''} ${
            errors.name ? styles.error : ''
          }`}
        >
          <label className={styles.label} htmlFor="name">
            Your Name
          </label>
          <input
            className={styles.input}
            id="name"
            type="text"
            value={name}
            onChange={handleChangeName}
          />
          <span className={errors.name ? styles.error : ''}>{errors.name}</span>
        </div>

        <div
          className={`${styles.formItem} ${success.email ? styles.success : ''} ${
            errors.email ? styles.error : ''
          }`}
        >
          <label className={styles.label} htmlFor="email">
            Your E-mail Address
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            value={email}
            onChange={handleChangeEmail}
          />
          <span className={errors.email ? styles.error : ''}>{errors.email}</span>
        </div>

        <div
          className={`${styles.formItem} ${success.text ? styles.success : ''} ${
            errors.text ? styles.error : ''
          }`}
        >
          <label className={styles.label} htmlFor="textarea">
            Further Comments
          </label>
          <textarea className={styles.textarea} value={text} onChange={handleChangeText} />
          <span className={errors.text ? styles.error : ''}>{errors.text}</span>
        </div>

        <div>
          <p>
            By submitting this notification of infringement, I am stating that I have a good faith
            belief that the use of the material complained of is not authorized by me, my agent or
            the law.
          </p>

          <p>
            By submitting this notification of infringement, I am stating that the information in
            this notification is accurate and that, under the penalty of perjury, that I am the
            owner or am authorized to act on behalf of the owner of the work that is allegedly
            infringed.
          </p>

          <p>
            By submitting this notification of infringement, I am providing my electronic signature.
          </p>
        </div>

        <div className={styles.result}>{result}</div>

        <button type="submit" className={styles.submitBtn} disabled={isButtonDisabled}>
          Send
        </button>
      </form>
    </div>
  );
};

export default DMCAForm;
