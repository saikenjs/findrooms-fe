import { Form, Select } from 'antd';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useDocumentTitle } from '~/hooks';
import { MainLayout } from '~/layouts';
import { districtAtom, wardsAtom } from '~/recoil/state';

const Home = () => {
  useDocumentTitle('Trang chủ');
  const districts = useRecoilValue(districtAtom);
  const [form] = Form.useForm();
  const wards = useRecoilValue(wardsAtom);
  const [filter, setFilter] = useState({ districtId: 0 });

  return (
    <MainLayout>
      <div>
        <Form
          layout='vertical'
          className='flex gap-3'
          onValuesChange={(change, all) => {
            if (change.districtId) {
              setFilter({ ...all, wardId: 0 });
              form.setFieldsValue({ ...all, wardId: 0 });
            } else {
              setFilter(all);
            }
          }}
        >
          <Form.Item
            rules={[{ required: true }]}
            name='districtId'
            label='Quận/huyện'
            initialValue='Chọn quận/huyện'
          >
            <Select>
              {districts.map((e) => (
                <Select.Option key={e.id} value={e.id}>
                  {e.prefix} {e.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            name='wardId'
            label='Xã/phường'
          >
            <Select>
              <Select.Option value={0}>Chọn xã/phường</Select.Option>
              {wards
                .filter((e) => e.districtId === filter.districtId)
                .map((e) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.prefix} {e.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
};

export default Home;
