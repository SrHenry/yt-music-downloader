# 🎵 YouTube Music Downloader

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x%20|%2022.x%20|%2024.x-green.svg)](https://nodejs.org/)
[![yt-dlp](https://img.shields.io/badge/yt--dlp-CLI-blue)](https://github.com/yt-dlp/yt-dlp)
[![Build Status](https://img.shields.io/github/actions/workflow/status/SrHenry/yt-music-downloader/ci.yml)](https://github.com/SrHenry/yt-music-downloader/actions)
[![Issues](https://img.shields.io/github/issues/SrHenry/yt-music-downloader)](https://github.com/SrHenry/yt-music-downloader/issues)
[![Stars](https://img.shields.io/github/stars/SrHenry/yt-music-downloader?style=social)](https://github.com/SrHenry/yt-music-downloader)

Este projeto é um utilitário CLI construído em Node.js para download de músicas do YouTube usando [`yt-dlp`](https://github.com/yt-dlp/yt-dlp), com suporte a organização de metadados (como autor, álbum, thumbnail), integrando-os diretamente aos arquivos `.flac` resultantes e interface modular baseada em comandos. Agora com suporte a variáveis de ambiente validadas e arquitetura extensível por comandos via `commander`.

## ⚙️ Requisitos

Este projeto depende de ferramentas **externas**, que precisam estar instaladas no sistema:

| Ferramenta | Descrição                                                                              | Instalação sugerida                                            |
|------------|----------------------------------------------------------------------------------------|----------------------------------------------------------------|
| `yt-dlp`   | Utilitário para download de vídeos do YouTube (suporte moderno)                        | [yt-dlp GitHub](https://github.com/yt-dlp/yt-dlp#installation) |
| `ffmpeg`   | Utilitário de manipulação de mídia (necessário para converter e incorporar thumbnails) | [FFmpeg.org](https://ffmpeg.org/download.html)                 |
| `Node.js`  | Plataforma JavaScript para executar os scripts                                         | [nodejs.org](https://nodejs.org/)                              |

---

> Certifique-se de que os comandos `yt-dlp` e `ffmpeg` estão disponíveis no seu terminal (adicionados ao PATH).

---

> ℹ️ Este projeto requer **Node.js** **20.x**, **22.x**, ou **24.x**.

## 📁 Estrutura do Projeto

```text
yt-music-downloader/                        # Raiz do projeto
├── bin/                                    # Scripts shell para execução direta
│   ├── workflow                            # Executa todo o fluxo: download + metadados
│   ├── thumbnail                           # Gera e embute thumbnail
│   ├── dl-playlist                         # Baixa todas as músicas de uma playlist
│   ├── cleanup                             # Remove arquivos e diretórios temporários
│   └── clear-logs                          # Apaga logs salvos
├── src/                                    # Código-fonte principal
│   ├── pipeline.js                         # Execução da pipeline completa
│   ├── workflow.js                         # Ponto de entrada principal da CLI
│   ├── autoload.js                         # Autoload inicial de configurações e variáveis
│   ├── log/                                # Logger customizado do projeto
│   │   └── index.js
│   ├── commands/                           # Comandos CLI via commander
│   │   ├── index.js
│   │   ├── clear/                          # Comandos de limpeza
│   │   │   └── logs/
│   │   │       └── index.js
│   │   └── download/                       # Comandos de download
│   │       ├── index.js
│   │       └── arguments/
│   │           └── sources.js              # Argumentos permitidos para o download
│   ├── env/                                # Validação e carregamento de variáveis de ambiente
│   │   ├── __autoload.js                   # Autoload das variáveis de ambiente
│   │   ├── index.js
│   │   ├── schemas/EnvSchema.js            # Esquema de validação do .env
│   │   └── validators/env.js
│   ├── functions/                          # Funções utilitárias principais
│   │   ├── downloadMusic.js
│   │   ├── embedThumbnail.js
│   │   ├── runYtDlp.js
│   │   ├── runFFmpeg.js
│   │   ├── fetchThumbnail.js
│   │   ├── extractYTContentID.js
│   │   └── ...
│   ├── shared/                             # Funções e constantes compartilhadas
│   │   ├── constants.js
│   │   └── functions/
│   │       ├── execAsync.js
│   │       ├── isValidURL.js
│   │       └── ...
│   └── @types/global.d.ts                  # Tipagens globais para intellisense
├── .env.example                            # Exemplo de configuração de ambiente
├── package.json                            # Configuração do projeto Node
└── yarn.lock                               # Lockfile de dependências
```

## 📚 Uso

Baixar uma música:

```bash
./bin/workflow "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

Baixar uma playlist:

```bash
./bin/dl-playlist "https://www.youtube.com/playlist?list..."
```

Gerar thumbnail separadamente:

```bash
./bin/thumbnail "<https://www.youtube.com/watch?v=abc123>"
```

Limpar arquivos temporários e logs:

```bash
./bin/cleanup
./bin/clear-logs
```

## 📦 Dependências

O projeto depende das seguintes bibliotecas em tempo de execução:

- `chalk`: para estilização de texto no terminal

- `commander`: parser de comandos CLI

- `debug`: sistema de debug condicional

- `dotenv`: carregamento de variáveis de ambiente

- `@srhenry/type-utils`: utilitários de validação tipada

## 📌 Observações

O projeto pode ser facilmente adaptado para rodar em cron jobs ou ser integrado a outros scripts de automação.

A estrutura está modularizada para facilitar manutenção e extensão.

As thumbnails são baixadas apenas uma vez e armazenadas como cache no disco, no diretório definido na variável de ambiente `THUMBNAILS_PATH` (pode ser definida no arquivo `.env`).

## 🤝 Contribuindo

Sinta-se à vontade para abrir PRs, issues ou sugerir melhorias.
