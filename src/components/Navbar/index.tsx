import React from 'react';
import { BUTTONS } from 'src/components/Navbar/data';
import * as ST from './styled';
import { useActions } from 'src/hooks/useActions';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import DownloadGraphLink from 'src/components/DownloadGraphLink';
import { translateTextToMatrix } from 'src/helpers/translateTextToMatrix';
import { translateMatrixToGraph } from 'src/helpers/translateMatrixToGraph';
import ImportButton from 'src/components/ImportButton';

const Navbar = () => {
    const { selectedEditor, graph } = useTypedSelector(state => state.app);
    const { changeEditor, setGraph } = useActions();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function() {
            setGraph(
                translateMatrixToGraph(
                    translateTextToMatrix(reader.result as string)
                )
            );
        };

        reader.onerror = function() {
            console.log(reader.error);
        };
    }

    return (
        <ST.Container>
            <ST.ButtonsContainer>
                {BUTTONS.map(btn => (
                    <ST.Button isActive={selectedEditor === btn.editor} key={btn.editor} onClick={() => changeEditor(btn.editor)}>
                        <img src={btn.img} />
                        {btn.text}
                    </ST.Button>
                ))}
            </ST.ButtonsContainer>
            <ST.ButtonsContainer>
                <ImportButton onChange={onChange} />
                <DownloadGraphLink graph={graph}>Download</DownloadGraphLink>
            </ST.ButtonsContainer>
        </ST.Container>
    );
};

export default Navbar;
