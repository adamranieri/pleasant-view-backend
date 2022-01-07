import { MemberDAO } from "../daos/member-dao";
import { Member } from "../entities";
import { LoginService, LoginServiceImpl } from "../services/login-service"


describe("Login Service Tests", ()=>{

    // Stub implementation for testing our service logic
    // some dummy guaranteed return value so I can write a test that I do not have to refactor
    const memberDaoStub: MemberDAO = {
         async getMemberByUsername(username:string): Promise<Member>{
            return {id:"", username:"matt", password:"pa$$word", checkedOutBooks:[], isEmployee:false}
        }
    }

    const loginService:LoginService = new LoginServiceImpl(memberDaoStub);

    it("Should throw an error if username and password does not match", async ()=>{

        try {
            await loginService.loginWithUsernamePassword("matt", "cool");       
            fail()
        } catch (error) {
            expect(error.message).toBe("Password does not match")
        }
        

    })

})