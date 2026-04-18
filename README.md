# Dev Overflow

> It's like Stack Overflow, with a sprinkle of AI ✨

**Tech stack:** Next.js, Typescript, TailwindCSS, shadcn/ui, Auth.js, Zod and more to come.

**Status:** In progress 🚧

## Dev Logs

- Back in the days, Tailwind v3 uses `tailwind.config.js` to configure themes. But now in v4, it changed to CSS-first configuration where the config was in `globals.css` file. This was a pretty nice change since less `.js` to think about, and all the config are just CSS (with the help of directives). But need to change the mental model since I already used to configure stuff using javascript object.

- Tailwind already provides lots of utility classes where we can mix and match inline CSS classes to give flexibility while maintaining proper CSS convention. But it also has this `@apply` directive so we can create our own reusable group of taiwind classes. The author of tailwind were [againts this method](https://github.com/tailwindlabs/tailwindcss/discussions/7651#discussioncomment-2250993) and only advice it for certain situations. I also mainly hate it since there's no Intellisense for the custom @apply class. But this time, the tailwind extension already supports the autocomplete and class definition for custom class. Interesting...
