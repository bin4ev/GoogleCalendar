export interface Event {
    id: string,
    start: string,
    end: string,
    date: string,
    color: string,
    createdBy: string,
    guests: {email:string, going: boolean}[],
    name: string,
}
