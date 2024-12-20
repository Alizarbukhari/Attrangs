import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Conditional from './conditional';
import { SignupTermProps } from '@/app/types/signupTypes';

const SignupTerm: React.FC<SignupTermProps> = ({ onAgree }) => {
  const [agreed, setAgreed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.value === 'agree');
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'over14') {
      setAgeConfirmed(true);
    } else {
      setAgeConfirmed(false);
    }
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToPrivacy(e.target.value === 'agree');
  };

  const handleCheck = () => {
    if (!agreed) {
      toast.error("Aapko terms ko agree karna hoga aage badhne ke liye.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (!ageConfirmed) {
      toast.error("Aapko apni umar confirm karni hogi.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (!agreedToPrivacy) {
      toast.error("Aapko Privacy Policy ko agree karna hoga.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    onAgree();
  };

  return (
    <>
      {/* Terms of Service Section */}
      <div className="w-[90%] mx-auto h-[520px] p-[25px] border border-[#dbdbdb] overflow-auto">
        <h1 className="text-[1.5em] font-bold text-center mb-4">Terms of Service</h1>

        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap"><strong>Article 1 (Purpose)</strong></p>
        <p className="text-[12px] text-[#808080] leading-[160%] my-2 whitespace-pre-wrap">These terms and conditions are intended to regulate the rights, obligations, and responsibilities of the cyber mall and users in using the Internet-related services (hereinafter referred to as &quot;services&quot;) provided by the Atrangs Cyber Mall (hereinafter referred to as &quot;Mall&quot;) operated by Atrangs Company (e-commerce business operator).</p>
        <p className="text-[12px] text-[#808080] leading-[160%] whitespace-pre-wrap"><em>※ These terms and conditions apply to electronic commerce using PC communication, wireless, etc., as long as they do not conflict with the nature of such transactions.</em></p>

        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap"><strong>Article 2 (Definition)</strong></p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">① &quot;Mall&quot; refers to a virtual business establishment set up by Atrangs Company to enable users to trade goods or services (hereinafter referred to as &quot;goods, etc.&quot;) using information and communication equipment such as computers, and is also used to refer to a business operator who operates a cyber mall.</p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">② &quot;User&quot; refers to members and non-members who access the &quot;Mall&quot; and receive services provided by the &quot;Mall&quot; in accordance with these Terms and Conditions.</p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">③ &quot;Member&quot; refers to a person who has registered as a member by providing personal information to the &quot;Mall&quot;, continuously receives information from the &quot;Mall&quot;, and can continuously use the services provided by the &quot;Mall&quot;.</p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">④ &quot;Non-member&quot; refers to a person who uses the services provided by the &quot;Mall&quot; without registering as a member.</p>

        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap"><strong>Article 3 (Specification, Explanation, and Revision of Terms and Conditions, etc.)</strong></p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">① &quot;Mall&quot; shall post the contents of these terms and conditions, the name of the company and representative, the address of the business location (including the address of the place where consumer complaints can be handled), telephone number, facsimile number, e-mail address, business registration number, mail-order business report number, personal information management officer, etc. on the initial service screen (front) of &quot;Mall&quot; so that users can easily see them. However, the contents of the terms and conditions may be made available for users to view through the link screen.</p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">② Before a user agrees to the terms and conditions, the mall must obtain the user&apos;s confirmation by providing a separate link screen or pop-up screen, etc., so that the user can understand important information stipulated in the terms and conditions, such as cancellation of subscription, delivery responsibility, and refund conditions.</p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">③ &quot;Mall&quot; may revise these Terms and Conditions to the extent that it does not violate related laws such as the Electronic Commerce Consumer Protection Act, the Terms and Conditions Regulation Act, the Electronic Commerce Act, the Electronic Signature Act, the Promotion of Information and Communications Network Utilization Act, the Door-to-Door Sales Act, and the Consumer Protection Act.</p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">④ When the &quot;Mall&quot; revises the terms and conditions, it will post the effective date and the reason for the revision on the Mall&apos;s home screen along with the current terms and conditions from 7 days prior to the effective date until the day before the effective date. However, when the terms and conditions are changed to the disadvantage of the user, it will post a notice at least 30 days in advance. In this case, the &quot;Mall&quot; will clearly compare the contents before and after the revision and display them so that the user can easily understand them.</p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">⑤ If the &quot;Mall&quot; revises the terms and conditions, the revised terms and conditions shall only apply to contracts concluded after the effective date, and the terms and conditions prior to revision shall remain applicable to contracts already concluded before that date. However, if a user who has already entered into a contract wishes to be subject to the revised terms and conditions, and sends a notice to the &quot;Mall&quot; within the notice period for the revised terms and conditions pursuant to Paragraph 3 and receives the consent of the &quot;Mall,&quot; the revised terms and conditions shall apply.</p>
        <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">⑥ Matters not specified in these Terms and Conditions and the interpretation of these Terms and Conditions shall be governed by the Act on Consumer Protection in Electronic Commerce, etc., the Act on Regulation of Terms and Conditions, etc., the Consumer Protection Guidelines in Electronic Commerce, etc. established by the Fair Trade Commission, and related laws and regulations or customary practices.</p>
      </div>

      {/* Agreement Radio Buttons */}
      <Conditional onAgreeChange={handleAgreeChange} />

      {/* Privacy Policy Section */}
      <div className="w-[90%] mx-auto h-[520px] p-[25px] border border-[#dbdbdb] overflow-auto">
        <p className="text-[14px]">Privacy Policy</p>
        <table className="p-4 border border-slate-400 my-6 text-[12px] text-[#808080] mt-2 w-full">
          <thead>
            <tr>
             
              
              <th className="border p-1">수집 목적</th>
              <th className="border p-1">수집 항목</th>
              <th className="border p-1">보유 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">
              회원가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충처리, 분쟁 조정을 위한 기록 보존              </td>
              <td className="border p-1">
              이름, 아이디, 비밀번호, 휴대폰번호, 이메일, 주소                </td>
              <td className="border p-1">회원 탈퇴 시 즉시 파기. 단, 부정이용 방지를 위해 30일간 보관 (아이디, 휴대폰번호) 후 파기</td>
            </tr>
            <tr>
              <td className="border p-1">서비스 방문 및 이용기록 분석, 부정이용 방지 등을 위한 기록 관리</td>
              <td className="border p-1">서비스 이용기록, IP 주소, 쿠키, MAC 주소, 모바일 기기정보(광고식별자, OS/앱 버전)</td>
              <td className="border p-1">회원 탈퇴 시 또는 이용목적 달성 시 즉시 파기</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Agreement Radio Buttons for Privacy Policy */}
      <Conditional onAgreeChange={handlePrivacyChange} />

      {/* Age Confirmation Section */}
      <div>
        <h3 className="w-[90%] mx-auto my-4 text-[15px] font-bold">
          Confirm that you are 14 years of age or older
        </h3>
      </div>
      <div className="w-[90%] mx-auto my-4 text-[14px] flex items-center gap-2 font-[500]">
        <input
          id="over14"
          className="mr-2"
          type="radio"
          name="age"
          value="over14"
          onChange={handleAgeChange}
        />
        <label htmlFor="over14">14 years old or older</label>

        <input
          id="under14"
          className="mr-2"
          type="radio"
          name="age"
          value="under14"
          onChange={handleAgeChange}
        />
        <label htmlFor="under14">Under 14 years old</label>
      </div>

      {/* Check Button */}
      <button
        className="block mx-auto mb-16 text-[15px] bg-black text-white cursor-pointer py-3 px-14"
        onClick={handleCheck}
      >
        Check
      </button>
    </>
  );
};

export default SignupTerm;
