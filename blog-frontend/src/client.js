import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: '96nhjn86', 
    dataset: 'production',
    useCdn: true
})