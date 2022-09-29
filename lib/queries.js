export const PROJECTS_QUERY = `{
    allProjects {
        titulo
        slug
    }
}`

export const IMAGES_QUERY = `{
    allImages {
        imagem {
            url
        }
        alinhamento
        tamanho
    }
}`

export const CONTACTS_QUERY = `{
    contact {
        bio
        email
        telefone
        imagem {
            url
        }
    }
}`

export const TEXTOS_QUERY = `{
    allTexts {
        texto
        titulo
    }
}`