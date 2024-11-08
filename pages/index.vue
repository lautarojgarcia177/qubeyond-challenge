<script setup lang="ts">
import { jokesTypes } from '~/constants';
import type { Joke } from '~/interfaces';
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const jokeType = ref(jokesTypes[0]);
const jokes = ref<Joke[]>([])
const selectedTab = ref(0)
const isOpenCreateJokeModal = ref(false)
const carouselRef = ref();

if (route.params.jokeType && jokesTypes.includes(String(route.params.jokeType))) {
    handleSelectJokeType(jokesTypes.indexOf(String(route.params.jokeType)))
}

const tabItems = [{
    label: 'General',
}, {
    label: 'Programming',
}, {
    label: 'Knock-knock',
}, {
    label: 'Dad',
}
]

async function fetchJokes() {
    try {
        const { data } = await useFetch(`/api/jokes?type=${jokeType.value}`)
        jokes.value = data.value
    } catch (error) {
        toast.add({
            description: error.statusMessage,
            color: 'red'
        })
    }
}

watch(() => jokeType.value, fetchJokes, { immediate: true })

async function handleLikeJoke(jokeId: string) {
    try {
        await $fetch('/api/joke-like', {
            method: 'patch',
            body: { id: jokeId }
        })
        await fetchJokes()
    } catch (error) {
        toast.add({
            description: error.statusMessage,
            color: 'red'
        })
    }
}

function handleSelectJokeType(selection: number) {
    jokeType.value = jokesTypes[selection]
    selectedTab.value = selection
    if (tabItems) {
        router.push(`/${tabItems[selectedTab.value].label}`)
    }
}

function handleOpenCreateJokeModal() {
    isOpenCreateJokeModal.value = true
}

async function handleDeleteJoke(id: string) {
    try {
        await $fetch(`/api/${id}`, {
            method: 'delete',
        })
        toast.add({
            description: 'Joke deleted',
        })
        await fetchJokes()
    } catch (error) {
        toast.add({
            description: error.statusMessage,
            color: 'red'
        })
    }
}

function deleteCurrentJoke() {
    const deleteJokeBtn = document.querySelector<HTMLButtonElement>('#delete-joke-btn');
    (deleteJokeBtn! as HTMLButtonElement).click()
}

const schema = object({
    type: string().required('Required'),
    setup: string().required('Required'),
    punchline: string().required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
    type: undefined,
    setup: undefined,
    punchline: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { type, setup, punchline } = event.data
    try {
        await $fetch('/api/joke', {
            method: 'post',
            body: {
                type,
                setup,
                punchline
            }
        })
        toast.add({
            description: 'Joke created',
        })
        state.type = undefined
        state.setup = undefined
        state.punchline = undefined
        await fetchJokes()
        isOpenCreateJokeModal.value = false
    } catch (error) {
        toast.add({
            description: error.statusMessage,
            color: 'red'
        })
    }
}
</script>

<template>
    <div>
        <p>Choose a type of joke...</p>
        <UTabs :items="tabItems" class="utabs" @change="handleSelectJokeType" v-model="selectedTab">
            <template #item="{ item }">
                <UCarousel ref="carouselRef" v-slot="{ item }" :items="jokes" :ui="{ item: 'basis-full' }" arrows>
                    <div
                        class="w-full h-80 flex flex-col justify-center items-center text-gray-600 bg-gray-100 text-2xl">
                        <p class="mb-2 text-center">
                            {{ item.setup }}
                        </p>
                        <p class="italic mb-2 text-center">
                            {{ item.punchline }}
                        </p>
                        <div class="flex items-center">
                            <UIcon name="i-fa6-regular:face-laugh-squint"
                                class="w-5 h-5 cursor-pointer hover:text-black mr-1" @click="handleLikeJoke(item.id)" />
                            <span class="mb-1">{{ item.likes }}</span>
                        </div>
                    </div>
                    <button id="delete-joke-btn" @click="handleDeleteJoke(item.id)" class="d-none"></button>
                </UCarousel>
            </template>
        </UTabs>
        <div class="flex flex-col items-end">
            <UButton @click="deleteCurrentJoke" color="red" class="flex items-center self-end">
                Delete this Joke
                <UIcon name="i-material-symbols:delete-outline" class="w-6 h-6" />
            </UButton>
            <UButton class="" @click="handleOpenCreateJokeModal">Create new Joke
                <UIcon name="i-material-symbols:add-circle-outline" class="w-6 h-6" />
            </UButton>
        </div>
        <UModal v-model="isOpenCreateJokeModal">
            <div class="p-4">
                <h1 class="mb-2">Write your Joke</h1>
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Type" name="setup">
                        <USelect v-model="state.type" :options="jokesTypes" />
                    </UFormGroup>

                    <UFormGroup label="Setup" name="setup">
                        <UTextarea v-model="state.setup" />
                    </UFormGroup>

                    <UFormGroup label="Punchline" name="punchline">
                        <UTextarea v-model="state.punchline" />
                    </UFormGroup>

                    <UButton type="submit">
                        Submit
                    </UButton>
                </UForm>
            </div>
        </UModal>
    </div>
</template>

<style lang="css">
.utabs {
    width: 23rem;
}

@media (min-width: 576px) {
    .utabs {
        width: 35rem;
    }
}

@media (min-width: 768px) {
    .utabs {
        width: 47rem;
    }
}

@media (min-width: 992px) {
    .utabs {
        width: 80rem;
    }
}
</style>