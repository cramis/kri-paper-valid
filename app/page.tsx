import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Link href="/paper-validation">
      <Button className="flex items-center justify-center gap-2">
        논문 검증
      </Button>
    </Link>
  );
}
