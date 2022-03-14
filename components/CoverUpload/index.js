import {useState} from 'react';
import clsx from 'clsx';
import {Button} from 'components/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload, faBan, faAlignCenter, faAlignLeft, faAlignRight} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

export function CoverUpload({isGenerating, gameName}) {
  const [coverFile, setCoverFile] = useState();
  const [alignment, setAlignment] = useState('center');

  return (
    <label
      htmlFor="cover-upload"
      style={{justifyContent: alignment}}
      className={clsx(styles.coverUpload, {
        [styles.downloading]: isGenerating,
      })}
    >
      {coverFile ? (
        <img src={URL.createObjectURL(coverFile)} alt={`${gameName} cover art`} />
      ) : (
        <span className={clsx(styles.label, {hidden: isGenerating})}>
          <span className={styles.labelText}>
            <FontAwesomeIcon icon={faUpload} className={styles.uploadIcon} />
            Upload a cover image (Optional)
          </span>
        </span>
      )}

      {coverFile && !isGenerating ? (
        <div className={styles.coverOptions}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setCoverFile(null);
            }}
          >
            <FontAwesomeIcon icon={faBan} />
          </Button>
          <Button onClick={() => setAlignment('flex-start')} active={alignment === 'flex-start'}>
            <FontAwesomeIcon icon={faAlignLeft} rotation={90} />
          </Button>
          <Button onClick={() => setAlignment('center')} active={alignment === 'center'}>
            <FontAwesomeIcon icon={faAlignCenter} rotation={90} />
          </Button>
          <Button onClick={() => setAlignment('flex-end')} active={alignment === 'flex-end'}>
            <FontAwesomeIcon icon={faAlignRight} rotation={90} />
          </Button>
        </div>
      ) : null}

      {!isGenerating ? (
        <input id="cover-upload" type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
      ) : null}
    </label>
  );
}
