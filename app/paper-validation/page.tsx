import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function PaperValidationPage() {
  return (
    <div className="container mx-auto p-4">
      <h1>논문 검증</h1>
      <p>여기에 논문 검증 결과가 표시됩니다.</p>

      <Link href="/api-test" className="mt-4 inline-block">
        <Button>검증 시작</Button>
      </Link>

      <hr className="my-4" />
      <div>
        <label htmlFor="okri_param1" className="block mb-2">
          OKRI 파라미터 1:
        </label>
        <Input id="okri_param1" />
      </div>

      <div>
        <label htmlFor="okri_param2" className="block mb-2">
          OKRI 파라미터 2:
        </label>
        <Input id="okri_param2" />
      </div>

      <div>
        <label htmlFor="okri_param3" className="block mb-2">
          OKRI 파라미터 3:
        </label>
        <Input id="okri_param3" />
      </div>

      <div>
        <label htmlFor="okri_param4" className="block mb-2">
          OKRI 파라미터 4:
        </label>
        <Input id="okri_param4" />
      </div>

      <div>
        <label htmlFor="okri_param5" className="block mb-2">
          OKRI 파라미터 5:
        </label>
        <Input id="okri_param5" />
      </div>

      <div>
        <label htmlFor="okri_param6" className="block mb-2">
          OKRI 파라미터 6:
        </label>
        <Input id="okri_param6" />
      </div>
      <div>
        <label htmlFor="okri_param7" className="block mb-2">
          OKRI 파라미터 7:
        </label>
        <Input id="okri_param7" />
      </div>
      <div>
        <label htmlFor="okri_param8" className="block mb-2">
          OKRI 파라미터 8:
        </label>
        <Input id="okri_param8" />
      </div>
      <div>
        <label htmlFor="okri_param9" className="block mb-2">
          OKRI 파라미터 9:
        </label>
        <Input id="okri_param9" />
      </div>
      <div>
        <label htmlFor="okri_param10" className="block mb-2">
          OKRI 파라미터 10:
        </label>
        <Input id="okri_param10" />
      </div>
      <div>
        <label htmlFor="okri_param11" className="block mb-2">
          OKRI 파라미터 11:
        </label>
        <Input id="okri_param11" />
      </div>
      <div>
        <label htmlFor="okri_param12" className="block mb-2">
          OKRI 파라미터 12:
        </label>
        <Input id="okri_param12" />
      </div>
      <div>
        <label htmlFor="okri_param13" className="block mb-2">
          OKRI 파라미터 13:
        </label>
        <Input id="okri_param13" />
      </div>
      <div>
        <label htmlFor="okri_param14" className="block mb-2">
          OKRI 파라미터 14:
        </label>
        <Input id="okri_param14" />
      </div>

      <div>
        <label htmlFor="okri_param15" className="block mb-2">
          OKRI 파라미터 15:
        </label>
        <Input id="okri_param15" />
      </div>

      <div>
        <label htmlFor="okri_param16" className="block mb-2">
          OKRI 파라미터 16:
        </label>
        <Input id="okri_param16" />
      </div>

      <div>
        <label htmlFor="okri_param17" className="block mb-2">
          OKRI 파라미터 17:
        </label>
        <Input id="okri_param17" />
      </div>
    </div>
  );
}
