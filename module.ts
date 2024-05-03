import { template } from 'lodash-es'
import { defineNuxtModule, addPluginTemplate, createResolver } from '@nuxt/kit'
import fs from 'fs'
import path from 'path'

// Define a Nuxt module that sets up a custom plugin template for the SPA loading screen.
export default defineNuxtModule({
    // The setup function is called with the Nuxt instance and module context.
    defaults: {
        delay: 2000, // Default delay `ms
    },

    setup(options, nuxt) {
        // Create a resolver for the current module URL.
        const { resolve } = createResolver(import.meta.url)
        
        // Register a hook that runs after all modules are processed.
        nuxt.hook('modules:done', () => {
            // Get the SPA loading template defined in Nuxt configuration.
            const spaLoadingTemplatePath = nuxt.options?.spaLoadingTemplate

            if (!spaLoadingTemplatePath) {
                console.warn(
                    'No SPA loading template path defined in Nuxt configuration',
                )
                return
            }

            // Read the contents of the SPA loading template HTML file
            const loadingTemplateContent = fs.readFileSync(
                path.resolve(__dirname, spaLoadingTemplatePath),
                'utf-8',
            )

            // Add the custom plugin template for the SPA loading screen.
            addPluginTemplate({
                getContents({ options }) {
                  const contents = readFileSync(resolve('./runtime/plugin.ts'), 'utf-8')
                  return template(contents)({ options })
                },
                mode: 'client',
                options: {
                    html: loadingTemplateContent,
                    delay: options?.delay || 0,
                },
            })
        })
    },
})
