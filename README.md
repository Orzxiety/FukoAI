# FukoAI
Простой Discord бот, который позволяет пользователям общаться с нейросетью **бесплатно**.

### `./config.json`
```json
{
    "BOT_TOKEN": "токен бота",
    "API_KEY": "ключ API",
    "MODEL_NAME": "модель нейросети (пример: chatgpt-3.5-turbo-16k)",
    "SUMMON_PREFIX": "префикс бота (пример: fuko )",
    "PERMITTED_GUILDS": ["ID сервера, где боту разрешено отвечать", "..."],
    "LOADING_EMOJI": "эмодзи загрузки (необязательно)"
}
```

> Бот использует **Freejourney API** для обращения к нейросетям. Документация и инструкция по получению API ключа доступны по ссылке: https://docs.freejourney.xyz/

### Лицензия
Код распространяется под лицензией [GNU General Public License v3.0](https://github.com/Orzxiety/FukoAI/blob/main/LICENSE).
