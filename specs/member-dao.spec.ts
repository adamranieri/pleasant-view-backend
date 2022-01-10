import { MemberDAO, MemberDAOLocalImpl } from "../daos/member-dao"


describe("Member DAO tests", ()=>{

    const memberDao:MemberDAO = new MemberDAOLocalImpl()

    it("Should get a member by username", async () => {
        const member = await memberDao.getMemberByUsername("gatorfan19")
        expect(member.isEmployee).toBe(true)
    })

    it("Should update a member", async ()=>{
        const member = await memberDao.getMemberByUsername("gatorfan19");
        member.checkedOutBooks = ["101","202"];
        await memberDao.updateMember(member);

        const updatedMember = await memberDao.getMemberByUsername("gatorfan19");
        expect(updatedMember.checkedOutBooks.length).toBe(2)
    })


})