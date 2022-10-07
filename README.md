[почти полностью скопировано со старого ридми, актуализировать]
# Запуск проекта
Запуск проекта для работы на деве:
`docker-compose build && docker-compose up -d`
**localhost:3070

Запуск на тесте: `docker-compose -f docker-compose.test.yml build && docker-compose -f docker-compose.test.yml up`

Запуск конкретного сайта на проде: `docker-compose -f youtubemp3donusturucu.yml build && docker-compose -f youtubemp3donusturucu.yml up`


## Переменные окружения
```
# добавить инкремент локали = 1
LANG_INCREMENT_SUFFIX=1

# список всех языков
LANGS_LIST=tr,fr,de,jp...

# аналитика
GOOGLE_TAG=GQLncYjRkYa8zd95LsaShwWrJb-XOV4JlPsikOwWydM
YM_COUNTER=76766131

# ютм_медиум для всех кнопок скачивания софта студии
UTM_MEDIUM=9

SITE_NAME=f3mp3
SITE_DOMAIN_SUFFIX=.com

# добавить банер, Interstitial, in-page push
IS_WITH_ADS=1

# генерация sitemap.txt
ENABLE_SITEMAP_TXT=1
```
