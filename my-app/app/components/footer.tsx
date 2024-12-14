import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto px-4 py-8 border-t border-b border-gray-300">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-sm font-bold mb-4">Delivery</h3>
            <p className="text-xs mb-2 text-gray-600">Exchange/Return Address:</p>
            <p className="text-xs text-gray-600">Atrangsdam, 237-14, Guro-dong, Guro-gu, Seoul, B1F</p>
            <h4 className="mt-4 font-bold text-sm">Customer Center</h4>
            <p className="text-xs text-gray-600">Consultation faster than a phone call:</p>
            <p className="text-xs text-gray-600">Consultation Hours:</p>
            <p className="text-xs text-gray-600">Mon-Fri: 11am-5pm</p>
            <p className="text-xs text-gray-600">Lunch: 12pm-1pm (Closed on weekends and public holidays)</p>
          </div>

          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-sm font-bold mb-4">Notice</h3>
            <ul className="text-xs text-gray-600">
              <li><Link href="#">2024 Chuseok Delivery Notice</Link></li>
              <li><Link href="#">Information on delivery schedule for Liberation Day</Link></li>
              <li><Link href="#">※ Urgent Notice ※ Server failure due to overload of simultaneous access traffic on May 28th</Link></li>
            </ul>

            <h3 className="text-sm font-bold mb-4 mt-6">About ATTRANGS</h3>
            <ul className="text-xs text-gray-600">
              <li>SN Fashion Group Co., Ltd.</li>
              <li>Representative: Gu Gil-li | Tel: 1644-3225 | Fax: 02)2231-4995</li>
              <li>Address: Atrangs, 237-14, Guro-dong, Guro-gu, Seoul</li>
              <li>Mail order business report: 2015-Seoul Guro-1525</li>
              <li>Business Registration Number: 215-87-38531</li>
              <li>Personal Information Protection Officer: Jeong Gi-yeol, Yoon Si-young (attrangs@naver.com)</li>
              <li>For partnership, sponsorship, and distribution inquiries: attrangs@naver.com</li>
              <li>© 2024 ATTRANGS. All Rights Reserved.</li>
            </ul>
          </div>

          <div className="w-full lg:w-1/3">
            <h3 className="text-sm font-bold mb-4">ONLY ATTRANGS</h3>
            <ul className="text-xs text-gray-600">
              <li>◎ Various delivery systems - Departing today, arriving today, arriving at dawn</li>
              <li>◎ Smart Site - Smart Search</li>
              <li>◎ 2,000-pyeong logistics service - from steam care to clean cover</li>
            </ul>
            <div className="relative w-full sm:w-[58%] h-[150px] my-4">
              <Image
                alt="Attrangs"
                loading="lazy"
                src="/images/footer.webp"
                layout="fill"
                className="rounded-[20px]"
                sizes="100vw"
              />
            </div>
            <h3 className="text-sm font-bold mb-4">Social</h3>
            <div className="flex gap-4 flex-wrap items-center">
  <Link href="#" className="cursor-pointer">
    <Image
      alt="Social1"
      loading="lazy"
      width={35}
      height={35}
      className="cursor-pointer rounded-full object-cover"
      src="/images/insta.webp"
    />
  </Link>
  <Link href="#" className="cursor-pointer">
    <Image
      alt="Social2"
      loading="lazy"
      width={35}
      height={35}
      className="cursor-pointer rounded-full object-cover"
      src="/images/fb.webp"
    />
  </Link>
  <Link href="#" className="cursor-pointer">
    <Image
      alt="Social3"
      loading="lazy"
      width={35}
      height={35}
      className="cursor-pointer rounded-full object-cover"
      src="/images/yt.webp"
    />
  </Link>
  <Link href="#" className="cursor-pointer">
    <Image
      alt="Social4"
      loading="lazy"
      width={35}
      height={35}
      className="cursor-pointer rounded-full object-cover"
      src="/images/ms.webp"
    />
  </Link>
</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center p-4 sm:p-6 gap-4">
  <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
    <p style={{ color: '#d7d7d7', fontSize: '14px' }}>SN Fashion Group.Co.Ltd Info</p>
    <ul className="flex gap-4">
      <li>
        <Link href="#" className="cursor-pointer">
          <Image
            alt="Footer mark 1"
            loading="lazy"
            width={32}
            height={32}
            src="/images/ft1.webp"
          />
        </Link>
      </li>
      <li>
        <Link href="#" className="cursor-pointer">
          <Image
            alt="Footer mark 2"
            loading="lazy"
            width={32}
            height={32}
            src="/images/ft2.webp"
          />
        </Link>
      </li>
      <li>
        <Link href="#" className="cursor-pointer">
          <Image
            alt="Footer mark 3"
            loading="lazy"
            width={32}
            height={32}
            src="/images/ft3.webp"
          />
        </Link>
      </li>
    </ul>
  </div>
</div>
    </footer>
  );
};

export default Footer;
