import React from 'react';
import './index.scss';
import { FileBlockType } from 'features/content';
import Button from 'components/commons/Button';
import Link from 'components/commons/Link';
import { getStrapiMedia } from 'utils/strapi';

// doesn't seem to work for pdf, change to blob?
const download = (dataurl: string, filename: string): void => {
    const link = document.createElement('a');
    link.href = dataurl;
    link.download = filename;
    link.click();
    link.remove();
};

const FileBlock = ( props: FileBlockType ) => {
    const { title, files } = props;

    const renderFiles = React.useCallback( () => {
        return files.data.map( file => {
            let fileIcon;
            let { url, type, caption, alt } = getStrapiMedia(file)
               
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
            return <div key={file.id} className='file-container col-4 col-sm-12'>
                <div  className='file r-16-3'>
                    <div className='file-wrapper f p1'>
                        <div className='file-icon' style={{
                            backgroundImage: `url(${fileIcon})`
                        }}></div>
                        <div className='file-caption f aic p05'>
                            <p>{caption}</p>
                        </div>
                        <div className='file-actions f aic jcc'>
                            <Link to={url!} target='_blank'><Button type='primary' shape='circle' iconName='external-link-square' /></Link>
                            <Button type='default' shape='circle' iconName='arrow-down' 
                                onClick={() => url ? download(url, file.attributes.name) : null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        })
    }, [files.data])

    return <div className='file-block full-w p1 my1'>
        <h2>{title}</h2>
        <div className='file-list'>{ renderFiles() }</div>
    </div>
}

export default FileBlock;