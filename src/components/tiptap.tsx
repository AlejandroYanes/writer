'use client';

import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';

interface Props {
  className?: string;
  slotBefore?: React.ReactNode;
}

const extentions = [
  StarterKit,
  Highlight,
  Typography,
];

const content =  `
    <p>
      Markdown shortcuts make it easy to format the text while typing.
    </p>
    <p>
      To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.
    </p>
    <p>
      Those conventions are called input rules in Tiptap. Some of them are enabled by default. Try <code>></code> for blockquotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>\`foobar\`</code> to highlight code, <code>~~tildes~~</code> to strike text, or <code>==equal signs==</code> to highlight text.
    </p>
    <p>
      You can overwrite existing input rules or add your own to nodes, marks and extensions.
    </p>
    <p>
      For example, we added the <code>Typography</code> extension here. Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, or <code>--</code>.
    </p>
    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Diam etiam libero bibendum viverra class proin iaculis nam. Mauris massa fames molestie pharetra justo phasellus amet massa scelerisque. Netus dignissim lobortis lacus efficitur, fringilla neque at elit. Laoreet aliquet tellus euismod ullamcorper rutrum pretium enim maximus. Auctor quisque ante pharetra velit interdum, hac inceptos curae. Viverra nulla facilisis pharetra sodales taciti suspendisse suspendisse. Dolor volutpat eros eget cras orci blandit. Viverra in blandit at per egestas.</p>
    <p>Litora bibendum primis; semper sem volutpat eget fusce. Mauris ut nam senectus aenean montes dictumst placerat nisi. Nibh nunc aliquet nec netus auctor ex taciti. Primis dictum parturient maximus laoreet imperdiet tortor hac. Nulla curae vel lectus lectus quis, per proin torquent. Eu lacus erat posuere id velit varius senectus aliquam ridiculus. Ridiculus felis sollicitudin lorem habitasse senectus etiam consequat purus porttitor. Molestie dictumst venenatis litora hendrerit dignissim praesent est. Nisl mi vel risus primis maximus ipsum.</p>
    <p>Vehicula per taciti est iaculis, tincidunt mus luctus. Tempor tortor fames consectetur rutrum parturient. Curabitur quis eu class porta morbi quisque fames. Cubilia hac nunc nascetur, congue himenaeos eget etiam in. Ipsum lorem nostra luctus suspendisse nullam condimentum ut. Luctus nisl a porttitor faucibus laoreet. Faucibus id sapien sollicitudin tempor pharetra magnis a luctus vulputate. Phasellus pharetra pulvinar velit quis nascetur in nulla molestie penatibus. Nisi porta sollicitudin taciti hendrerit porta interdum placerat justo? Hendrerit in ornare justo netus in interdum luctus ante.</p>
    <p>Ultrices dictum pretium feugiat; senectus pretium felis. Arcu vestibulum venenatis molestie interdum torquent sagittis posuere nisi. Bibendum vestibulum praesent etiam dictumst, amet porta feugiat. Facilisi ornare a arcu aenean mollis duis interdum. Facilisis massa dignissim hendrerit maecenas taciti. Luctus convallis eu penatibus ante nibh, quis blandit. Accumsan felis iaculis; blandit morbi habitant a efficitur condimentum. Venenatis maximus aptent nostra neque ante augue penatibus arcu nec. Ac penatibus a tempor eros pellentesque justo a montes litora.</p>
    <p>Commodo montes curae curae facilisi in erat penatibus. Viverra vulputate aliquet iaculis massa turpis quam ex. Tincidunt nam ut sapien nec curae curae. Phasellus sed fringilla nostra magna odio libero netus tincidunt. Mi iaculis enim ligula id hendrerit elementum convallis. Cras montes fringilla libero quis porta aenean quisque nibh varius. Mauris senectus accumsan mollis integer conubia dis. Accumsan duis hendrerit placerat eros tellus quisque non nulla. Tellus odio primis non conubia, maximus phasellus mus.</p>
    `;

const Tiptap = (props: Props) => {
  const { className, slotBefore } = props;

  return (
    <EditorProvider
      extensions={extentions}
      slotBefore={slotBefore}
      content={content}
      editorProps={{ attributes: { ...(className ? { class: className } : {}) } }}
    />
  );
}

export default Tiptap;
