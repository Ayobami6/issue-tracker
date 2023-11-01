'use client'
import { TextField, Text, Button, Callout } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/createIssueSchema';
import { z } from 'zod'


type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    const handleCreateIssue = async (data: IssueForm) => {
        try {
            const dataRes = await axios.post('/api/issues', data)
            console.log(dataRes)
            router.push('/issues')
        } catch (error) {
            setError('An error as occurred!')
        }

    }

    return (
        <div className='max-w-2xl'>
            {error &&
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }

            <form className='space-y-3' onSubmit={handleSubmit((data) => handleCreateIssue(data))}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')}>

                    </TextField.Input>

                </TextField.Root>
                {errors.title && <Text as='p' color='red'>{errors.title.message}</Text>}
                <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder='Description' {...field} />} />
                {errors.title && <Text color='red' as='p'>{errors.description?.message}</Text>}
                <Button>Submit an issue</Button>
            </form>
        </div>

    )
}

export default NewIssuePage