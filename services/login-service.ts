import { MemberDAO } from "../daos/member-dao";
import { Member } from "../entities";


export interface LoginService{

    loginWithUsernamePassword(username: string, password: string): Promise<Member>

}

export class LoginServiceImpl implements LoginService{

    private memberDao:MemberDAO

    constructor(memberDao: MemberDAO){
        this.memberDao = memberDao
    }

    async loginWithUsernamePassword(username: string, password: string) {
        const member: Member = await this.memberDao.getMemberByUsername(username);

        if(member.password !== password){
            throw new Error("Password does not match")
        }else{
            return member
        }

    }

}