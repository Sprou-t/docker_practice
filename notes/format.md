| Step | Instruction           | Purpose                                      |
| ---- | --------------------- | -------------------------------------------- |
| 1    | `FROM`                | Base image (e.g. `node`, `ubuntu`, `python`) |
| 2    | `LABEL`               | Metadata (e.g. author, description)          |
| 3    | `ENV`                 | Set environment variables                    |
| 4    | `WORKDIR`             | Set working directory inside container       |
| 5    | `COPY` / `ADD`        | Copy files from host into image              |
| 6    | `RUN`                 | Install dependencies, system updates         |
| 7    | `EXPOSE`              | Document which ports are used                |
| 8    | `CMD` or `ENTRYPOINT` | Specify command to run                       |

# 1. Base image

FROM node:20

# 2. Metadata

LABEL maintainer="yourname@example.com"

# 3. Environment variables

ENV NODE_ENV=production

# 4. Working directory

WORKDIR /app

# 5. Copy dependencies (for cache optimisation) and install

COPY package\*.json ./
RUN npm install

# 6. Copy app files

COPY . .

# 7. Expose port

EXPOSE 3000

# 8. Start app

CMD ["node", "index.js"]
