import { Member } from "../entities";
import {readFile, writeFile} from 'fs/promises'

export interface MemberDAO{
    getMemberByUsername(username: string):Promise<Member>
    updateMember(member: Member): Promise<Member>
}

export class MemberDAOLocalImpl implements MemberDAO{

    async getMemberByUsername(username: string): Promise<Member> {
        const file = await readFile("C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localmembers.json")
        const members:Member[] = JSON.parse(file.toString())
        return members.find(m => m.username === username)
    }

    async updateMember(member: Member): Promise<Member>{
        const file = await readFile("C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localmembers.json")
        const members:Member[] = JSON.parse(file.toString())
        const index = members.findIndex(m => m.id === member.id)
        members.splice(index,1, member);
        await writeFile("C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localmembers.json", JSON.stringify(members))
        return member;
    }

}