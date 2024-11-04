import Block from './_components/block';
import CardsCluster from './_components/cards-cluster';
import BreakDown from './_components/break-down';
import SingleStat from '@/app/gallery/_components/single-stat';

export default function GalleryPage() {
  return (
    <main className="p-10 grid grid-cols-2 gap-2">
      <Block>
        <CardsCluster />
      </Block>
      <Block>
        <BreakDown />
      </Block>
      <Block>
        <SingleStat />
      </Block>
    </main>
  );
}
