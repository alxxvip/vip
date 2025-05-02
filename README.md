# Kalsima Backend

[![Donate](https://img.shields.io/badge/Donate-GitHub%20Sponsors-PURPLE)](https://github.com/sponsors/Kalsima)
[![Deploy](https://github.com/mohibalkal/backend/actions/workflows/deploy.yml/badge.svg)](https://github.com/mohibalkal/backend/actions/workflows/deploy.yml)


Kalsima Backend is a from scratch rewrite for the old Fastify and MikroOrm version with backwards compatibility!

## Tech Stack
This repo uses:
- [Nitro](https://nitro.build)
- [Prisma](https://pris.ly)
- [Zod](https://zod.dev)

along with other minor libraries, we chose Nitro for its fast DX, easy support for caching, minimal design, and rapid prototyping. Prisma due to it's clear syntax, typesafety, and popularity. Zod for validation.

# Goals
Since we've changed the codebase so much for better DX that comes with more changes!
- [ ] Recommendations using ML models to provide accurate Recommendations via embeddings using a vector database
- [x] Ratings, partly for the affirmentioned goal
- [ ] Client wrapper library for any site that wants to keep user data related to movies, films, and recommendations

## Minor information
Only make PRs to `beta` branch
Production deployments are [here](https://backend.kalsima.net)
Beta deployments are [here](https://beta.backend.kalsima.net)