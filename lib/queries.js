export const PROJECTS_QUERY = `{
    allProjects {
        slug
        titulo
        lista
    }
    allLivros {
        slug
        titulo
    }
}`

export const IMAGES_QUERY = `{
    homePage {
        imagens {
            imagem {
                url
            }
            alinhamento
            tamanho
        }
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

export const EXPO_QUERY = `{
    expo {
        titulo
        texto
        lista
        imagens {
            imagem {
            width
            height
            url
            }
            tamanho
            alinhamento
        }
        }
    }`