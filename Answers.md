1. What's a closure? Where in the code is there a closure?

A closure in Javascript is what gives a function access to its outer scope, even after that scope has finished executing.

This is particularly useful in Vue, where reactive variables are often defined at a higher level to be shared across multiple components or functions within the same script scope.

I have use it in my component `pages/index.vue` where ref and reactive variables act like global variables for the functions defined in this scope. When functions like fetchJokes or handleLikeJoke access jokeType, isLoading, or toast, they create closures around these outer-scope variables. This ensures they can still interact with and update these variables even when they're invoked outside of their immediate scope (e.g., by a UI event or a watcher).

2. Which are the potential side-effects in any function? Could you point out any of these cases in your code? Are they expected? Can they be avoided?

I take advantage of side effects for application functionality like modifying variables outside the function, performing network requests, writing to a database, or updating the UI.

For instance, when modifying reactive variable "isLoading" update the UI, displaying an skeleton instead of the actual content while it is loading until it is ready.

``` plaintext
async function fetchJokes() {
    isLoading.value = true;  // Side effect: the UI displays the Loading Skeleton
    ...
    isLoading.value = false; // Side effect: the UI displays the Content
}

<template v-if="isLoading"> 
    // Loading Skeleton ...
 </template>
<template v-if="!isLoading"> 
    // Loaded content...
</template>
```

The side effect is expected in this case, if more control is desired, the state could be managed in a centralized way using a store, decoupling the state mutation from the component or individual functions. With a store we dispatch actions and then the store handles it, preventing it if necesary.