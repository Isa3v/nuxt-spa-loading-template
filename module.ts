import { defineNuxtModule, addPluginTemplate, createResolver } from '@nuxt/kit';
import { promises as fsp, readFileSync } from 'node:fs';

// Define a Nuxt module that sets up a custom plugin template for the SPA loading screen.
export default defineNuxtModule({
    // The setup function is called with the Nuxt instance and module context.
    defaults: {
        delay: 2000 // Default delay `ms
    },
    setup(options, nuxt) {
        // Create a resolver for the current module URL.
        const { resolve } = createResolver(import.meta.url);
        // Register a hook that runs after all modules are processed.
        nuxt.hook('modules:done', () => {
            // Get the SPA loading template defined in Nuxt configuration.
            const spaLoadingTemplate = nuxt.options?.spaLoadingTemplate;

            // Add the custom plugin template for the SPA loading screen.
            addPluginTemplate({
                src: resolve('./runtime/plugin.ts'),
                options: {
                    html: spaLoadingTemplate ? readFileSync(String(spaLoadingTemplate), 'utf-8') : '',
                    delay: options?.delay || 0
                }
            });
        });
    }
});
