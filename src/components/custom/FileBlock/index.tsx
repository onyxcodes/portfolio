import React from 'react';
import './index.scss';
import { FileBlockType } from 'features/content';
import Button from 'components/commons/Button';
import Link from 'components/commons/Link';
import { getStrapiMedia } from 'utils/strapi';

const download = async (url: string, filename: string, mime: string) => {
    const a = document.createElement('a');
    if ( ['application/pdf'].includes(mime) || mime.match(/^image/) ) {
        let result = await fetch(url);
        let blob = await result.blob()
        a.href = URL.createObjectURL(blob);
    } else {
        a.href = url;
    }
    a.download = filename;
    a.click();
    a.remove()
};

const FileBlock = ( props: FileBlockType ) => {
    const { title, files, size = 'l', position = 'center' } = props;

    const renderFiles = React.useCallback( () => {
        return files.data.map( file => {
            let fileIcon;
            let { url, type, caption, alt } = getStrapiMedia(file)
            if ( !url ) throw new Error('Unable to resolve file url');
            switch ( type ) {
                case type?.match(/^image/)?.input:
                    fileIcon = require('assets/file-icons/image_icon.svg')
                break;
                case type?.match(/^video/)?.input:
                    fileIcon = require('assets/file-icons/movie_icon.svg')
                break;
                case 'application/pdf':
                    fileIcon = require('assets/file-icons/pdf_file_icon.svg')
                break;
            }
            return <div key={file.id} className='file-container col-4 col-lg-12'>
                <div  className='file r-16-3'>
                    <div className='file-wrapper f p1'>
                        <div className='file-icon' style={{
                            backgroundImage: `url(${fileIcon})`
                        }}></div>
                        <div className='file-caption f aic p05'>
                            <span title={caption}>{caption}</span>
                        </div>
                        <div className='file-actions f aic jcc'>
                            <Link to={url!} target='_blank'><Button type='primary' shape='circle' iconName='external-link-square' /></Link>
                            <Button type='default' shape='circle' iconName='arrow-down' 
                                onClick={() => url && type ? download(url, file.attributes.name, type) : null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        })
    }, [files.data]);

    let blockClass = 'file-block f';

    // Based on the position assign class to outer container
    switch ( position ) {
        case 'start':
            blockClass = `${blockClass} jcs`;
        break;
        case 'center':
            blockClass = `${blockClass} jcc`;
        break;
        case 'end':
            blockClass = `${blockClass} jce`;
        break;
    }

    // Based on the size assign class to inner container
    // consider that for bigger sizes should be centered for mobile devices
    let blockWrapperClass = 'file-block-wrapper f p1 fd-col'
    switch ( size ) {
        case 'xl':
            blockClass = `${blockClass} jcc-sm`;
            blockWrapperClass = `${blockWrapperClass} col-12`;
        break;
        case 'l':
            blockClass = `${blockClass} jcc-sm`;
            blockWrapperClass = `${blockWrapperClass} m1 col-9 col-lg-10 col-sm-11`;
        break;
        case 'm':
            // blockClass = `${blockClass}`;
            blockWrapperClass = `${blockWrapperClass} m1 col-7 col-lg-8 col-sm-9`;
        break;
    }
    
    return <div className={blockClass}>
        <div className={blockWrapperClass}>
            <h2>{title}</h2>
            <div className='file-list p05'>{ renderFiles() }</div>
        </div>
    </div>
}

export default FileBlock;