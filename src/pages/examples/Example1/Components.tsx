import { FC, ReactNode, VFC } from 'react';

import { Row } from '../../../components/Row';


// const SimpleComponent = ({ name }: { name: string }) => <Row>{name}</Row>;

const SimpleComponent: VFC<{ name: string }> = ({ name }) => <Row>{name}</Row>;

// const ComponentWithChildren = ({ name, children }: { name: string, children?: ReactNode | string | undefined }) =>
//   <Row>{name} {children}</Row>;

const ComponentWithChildren: FC<{ name: string }> = ({ name, children }) => <Row>{name} {children}</Row>;

const ComponentWithChildrenWithProps: VFC<{ name: string, children?: (props: { name: string }) => ReactNode | undefined }> =
  ({ children, ...props }) => {
    return <Row> {children && children(props)} </Row>;
  };

export const Components: VFC = () => <>
  <SimpleComponent name={'Simple component'}/>
  <ComponentWithChildren name={'ComponentWithChildren'}>
    some other element
  </ComponentWithChildren>
  <ComponentWithChildrenWithProps name={'ComponentWithChildrenWithProps'}>
    {
      ({ name }) => `some other component as child from ${name}`
    }
  </ComponentWithChildrenWithProps>
</>;