"use client";

import useSWR from "swr"
import Image from 'next/image'

const fetcher = ( term: string ) =>
    fetch( "/api/suggestions?term=" + term ).then( ( res ) => res.json() );

function AISuggestion ( { term }: { term: string } )
{
    const { data, error, isLoading, isValidating } = useSWR(
        "suggestions",
        () => fetcher( term ),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const generateText = () =>
    {
        if ( isLoading || isValidating )
            return (
                <>
                    {/* <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" /> */ }
                    <Image
                        src='/bot.png'
                        alt='Robo'
                        width={ 0 }
                        height={ 0 }
                        sizes="40vw"
                        quality={ 100 }
                        style={ { width: '14%', height: 'auto' } }
                        className='p-2 sm:p-8 md:p-14 animate-bounce rounded-full'
                    />
                    <p className="text-sm text-gray-400">AI Assistant is thinking...</p>
                </>
            );

        if ( error ) return <>Error...</>;
        if ( !data ) return <>No data</>;

        return (
            <>
                {/* <div className="animate-pulse rounded-full bg-gradient-to-t from-white h-10 w-10 border-2 flex-shrink-0 border-white" /> */}
                <Image
                    src='/bot.png'
                    alt='Robo'
                    width={ 0 }
                    height={ 0 }
                    sizes="40vw"
                    quality={ 100 }
                    style={ { width: '14%', height: 'auto' } }
                    className='p-2 sm:p-8 md:p-14 animate-pulse rounded-full'
                /> 

                <div>
                    <p className="text-sm text-gray-400">
                        OpenAI (Azure Functions) Assistant Suggests:{ " " }
                    </p>
                    <p className="italic text-xl">&quot;{ data.message }&quot;</p>
                </div>
            </>
        );
    };

    return (
        <div className="flex space-x-5 items-center px-10">{ generateText() }</div>
    );
}

export default AISuggestion;