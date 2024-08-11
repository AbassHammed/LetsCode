import Image from 'next/image';

import IconImage from '../../public/Icon.png';

export default function MobileScreen() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-center space-y-3">
      <div className="flex flex-col items-center">
        <Image
          src={IconImage}
          alt="LetsCode Logo"
          width={100}
          height={100}
          quality={95}
          priority
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
        <h1 className="fonth1 ml-2">LetsCode</h1>
      </div>
      <p>
        This app is designed for larger screens. The app&apos;s design won&apos;t work optimally on
        smaller screens. Please use a larger screen for the best experience
      </p>
    </div>
  );
}
