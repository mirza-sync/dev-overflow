# Dev Overflow

> It's like Stack Overflow, with a sprinkle of AI ✨

**Tech stack:** Next.js, Typescript, TailwindCSS, shadcn/ui, Auth.js, Zod and more to come.

**Status:** In progress 🚧

## Dev Logs

- Back in the days, Tailwind v3 uses `tailwind.config.js` to configure themes. But now in v4, it changed to CSS-first configuration where the config was in `globals.css` file. This was a pretty nice change since less `.js` to think about, and all the config are just CSS (with the help of directives). But need to change the mental model since I already used to configure stuff using javascript object.

- Tailwind already provides lots of utility classes where we can mix and match inline CSS classes to give flexibility while maintaining proper CSS convention. But it also has this `@apply` directive so we can create our own reusable group of taiwind classes. The author of tailwind were [againts this method](https://github.com/tailwindlabs/tailwindcss/discussions/7651#discussioncomment-2250993) and only advice it for certain situations. I also mainly hate it since there's no Intellisense for the custom @apply class. But this time, the tailwind extension already supports the autocomplete and class definition for custom class. Interesting...

- Javascript changes a lot. Shadcn's Form component was deprecated and the default html `form` primitive instead. Unfortunately Zod v4 resolver doesn't work properly with the new form approach and the docs didn't mention about this. Setting things up from scratch is quite frustrating since we need to face zod's type gymnastic along side React Hook Form's verbosity. But when all the set up was done, working with the form is a breeze. Intellisense FTW.

- In client component, we can get url params using the `useSearchParams` hook. But how to access it for server components? Turns out next.js injects a [props](https://nextjs.org/docs/app/api-reference/file-conventions/page) to the page.tsx, so we can access the url `params` and `searchParams` on server side. I don't even know that page.tsx can have props lol. The more you know.

- Setting Prettier to [auto-sort tailwind classes](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) was cool. It sorts classes in the order of: `base > components > utilities`. It will also group modifiers together (e.g: `hover:`, `dark:`, `sm:`), and put custom classes to the front. But today I realized when reading code diff, I can't differentiate between which css class that I added, and which one that I changed. Usually if we add something to our code, we'll put it in the end; in this case `classname = "class1 class2 class3 class4 new-class-x new-class-y"`. Taking a glimpse of this in a **code diff**, `new-class-x` and `new-class-y` will be highlighted in the end of `classname`, so I know that someone added some new classes. But if auto-sort prettify the code into `classname = "class1 new-class-x class2 new-class-y class3 class4"`, code diff will highlight some classes in the middle, and it will appear that someone modified some classes (e.g: increase margin size, change text color, etc). More attention will be needed when doing code review since I'll automatically need to observe why css changes, and turns out it's just some new class added 😑. Hence, the auto-sort can sometimes be a nuance. For a personal project, I'll still use it since I like my css class to look organized. But for a team project, it should be used if everybody in the team agree to use it.
