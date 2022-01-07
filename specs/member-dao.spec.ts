import { MemberDAO, MemberDAOLocalImpl } from "../daos/member-dao"


describe("Member DAO tests", ()=>{

    const memberDao:MemberDAO = new MemberDAOLocalImpl()

    it("Should get a member by username", async () => {

        const member = await memberDao.getMemberByUsername("gatorfan19")
        expect(member.isEmployee).toBe(true)
    })

})