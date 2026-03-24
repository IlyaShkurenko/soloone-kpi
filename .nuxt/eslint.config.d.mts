import type { FlatConfigComposer } from "../node_modules/.pnpm/eslint-flat-config-utils@3.0.2/node_modules/eslint-flat-config-utils/dist/index.mjs"
import { defineFlatConfigs } from "../node_modules/.pnpm/@nuxt+eslint-config@1.15.2_@typescript-eslint+utils@8.57.2_eslint@9.39.4_jiti@2.6.1__ty_ecd84825372f3fcb192f5cd49f6329ee/node_modules/@nuxt/eslint-config/dist/flat.mjs"
import type { NuxtESLintConfigOptionsResolved } from "../node_modules/.pnpm/@nuxt+eslint-config@1.15.2_@typescript-eslint+utils@8.57.2_eslint@9.39.4_jiti@2.6.1__ty_ecd84825372f3fcb192f5cd49f6329ee/node_modules/@nuxt/eslint-config/dist/flat.mjs"

declare const configs: FlatConfigComposer
declare const options: NuxtESLintConfigOptionsResolved
declare const withNuxt: typeof defineFlatConfigs
export default withNuxt
export { withNuxt, defineFlatConfigs, configs, options }