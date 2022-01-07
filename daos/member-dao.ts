import { Member } from "../entities";
import {readFile} from 'fs/promises'

export interface MemberDAO{
    getMemberByUsername(username: string):Promise<Member>
}

export class MemberDAOLocalImpl implements MemberDAO{

    async getMemberByUsername(username: string): Promise<Member> {
        const file = await readFile("C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localmembers.json")
        const members:Member[] = JSON.parse(file.toString())
        return members.find(m => m.username === username)
    }

}