FROM node:22

# Install pnpm globally
RUN npm i -g pnpm

WORKDIR /usr/src/app

# Copy only package files first (for caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

EXPOSE 5000

# Default command → overridden by docker-compose
CMD ["pnpm", "start"]
