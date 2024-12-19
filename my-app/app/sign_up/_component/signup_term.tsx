// signup_term.tsx
import React, { useState } from 'react';
import Conditional from './conditional';

interface SignupTermProps {
  onAgree: () => void;
}

const SignupTerm: React.FC<SignupTermProps> = ({ onAgree }) => {
  // State variables to manage agreements and confirmations
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
      alert("Aapko terms ko agree karna hoga aage badhne ke liye.");
      return;
    }

    if (!ageConfirmed) {
      alert("Aapko apni umar confirm karni hogi.");
      return;
    }

    if (!agreedToPrivacy) {
      alert("Aapko Privacy Policy ko agree karna hoga.");
      return;
    }

    onAgree();
  };

  return (
    <>
      {/* Terms of Service Section */}
      <div className="w-[90%] mx-auto h-[520px] p-[25px] border border-[#dbdbdb] overflow-auto">
  <h1 className="text-[1.5em] font-bold text-center mb-4">Terms of Service</h1>

  <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">
    <strong>Article 1 (Purpose)</strong>
  </p>
  <p className="text-[12px] text-[#808080] leading-[160%] my-2 whitespace-pre-wrap">
    These terms and conditions are intended to regulate the rights, obligations, and responsibilities of the cyber mall and users in using the Internet-related services (hereinafter referred to as &quot;services&quot;) provided by the Atrangs Cyber Mall (hereinafter referred to as &quot;Mall&quot;) operated by Atrangs Company (e-commerce business operator).
  </p>
  <p className="text-[12px] text-[#808080] leading-[160%] whitespace-pre-wrap">
    <em>※ These terms and conditions apply to electronic commerce using PC communication, wireless, etc., as long as they do not conflict with the nature of such transactions.</em>
  </p>

  <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">
    <strong>Article 2 (Definition)</strong>
  </p>
  <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">
    ① &quot;Mall&quot; refers to a virtual business establishment set up by Atrangs Company to enable users to trade goods or services (hereinafter referred to as &quot;goods, etc.&quot;) using information and communication equipment such as computers, and is also used to refer to a business operator who operates a cyber mall.
  </p>
  <p className="text-[12px] text-[#808080] leading-[160%] mt-2 whitespace-pre-wrap">
    ② &quot;User&quot; refers to members and non-members who access the &quot;Mall&quot; and receive services provided by the &quot;Mall&quot; in accordance with these Terms and Conditions.
  </p>
  {/* <!-- Rest of the content remains the same --> */}
</div>

      {/* Agreement Radio Buttons for Terms of Service */}
      <Conditional onAgreeChange={handleAgreeChange} />

      {/* Privacy Policy Section */}
      <div className="w-[90%] mx-auto h-[520px] p-[25px] border border-[#dbdbdb] overflow-auto">
        <p className="text-[14px]">Privacy Policy</p>
        <table className="p-4 border border-slate-400 my-6 text-[12px] text-[#808080] mt-2 w-full">
          <thead>
            <tr>
              <th className="border p-1">Purpose of Collection</th>
              <th className="border p-1">Collection Items</th>
              <th className="border p-1">Holding Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">
                Confirmation of intent to join membership, user identification and identity verification, maintenance and management of membership qualifications, contact for contract performance and notification of changes to terms and conditions, confirmation of intent and handling of customer complaints such as civil complaints, prevention of fraudulent use, prevention of unauthorized use and provision of services and contract performance, securing a smooth communication channel for service use and consultation, inquiries, reviews, etc., provision of customized member services, provision of base-based services
              </td>
              <td className="border p-1">Name, ID, password, mobile phone number, email, address</td>
              <td className="border p-1">Upon withdrawal of membership, the information will be destroyed immediately. To prevent misuse, the information will be stored for 30 days (ID, mobile phone number) and then destroyed.</td>
            </tr>
            <tr>
              <td className="border p-1">Record management for analysis of service visit and usage history, prevention of fraudulent use, etc.</td>
              <td className="border p-1">Service usage history, IP address, cookies, MAC address, mobile device information (advertising identifier, OS/app version)</td>
              <td className="border p-1">Destroyed immediately upon withdrawal of membership or achievement of purpose of use</td>
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
