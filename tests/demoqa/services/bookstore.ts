import { APIResponse, expect, request } from '@playwright/test'

const BOOKSTORE = '/BookStore/v1'

export interface Book {
    isbn: string
    title: string
    subTitle: string
    author: string
    publish_date: Date
    publisher: string
    pages: number
    description: string
    website: string
}

export async function getAllBooks(): Promise<Book[]> {
    const api = await request.newContext()
    const response = await api.get(`${BOOKSTORE}/Books`)
    expect(response).toBeOK()
    const { books } = await response.json()
    return books.map(({ publish_date, ...book }: any): Book => ({  // destructure publish_date and everything else into Book objects for type checking
        ...book,                                                   // everything within book except publish_date
        publish_date: new Date(publish_date)                       // convert publish_date to a proper Date object
    }))
}

export async function addBooksToUserById(userId: string, token: string, books: Book[]): Promise<APIResponse> {
    const api = await request.newContext()
    const isbns = books.map(({ isbn }) => ({ isbn }))          // returns an array of objects [{isbn: '123'}, {isbn: '4567'}, ...]
    const response = await api.post(`${BOOKSTORE}/Books`, {
        data: {
            userId: userId,                                   // the user to add the books to
            collectionOfIsbns: isbns                          // the ISBNs of the books to add
        },
        headers: {                                            // many requests require some form of authentication
            Authorization: `Bearer ${token}`                  // in this case, using a bearer token we create in the account service
        }
    })
    expect(response).toBeOK()
    return response
}
