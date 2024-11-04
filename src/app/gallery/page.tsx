import Block from './_components/block';
import CardsCluster from './_components/cards-cluster';
import BreakDown from './_components/break-down';
import SingleStat from './_components/single-stat';
import SingleChart from './_components/single-chart';
import FancyTable from './_components/fancy-table';

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
      <Block>
        <SingleChart />
      </Block>
      <Block>
        <FancyTable />
      </Block>
    </main>
  );
}
