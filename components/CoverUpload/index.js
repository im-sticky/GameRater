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
        [styles.spaced]: !coverFile && isGenerating,
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
            secondary
            onClick={(e) => {
              e.preventDefault();
              setCoverFile(null);
            }}
          >
            <FontAwesomeIcon icon={faBan} />
          </Button>
          <AlignmentButton
            icon={faAlignLeft}
            alignment="flex-start"
            currentAlignment={alignment}
            setAlignment={setAlignment}
          />
          <AlignmentButton
            icon={faAlignCenter}
            alignment="center"
            currentAlignment={alignment}
            setAlignment={setAlignment}
          />
          <AlignmentButton
            icon={faAlignRight}
            alignment="flex-end"
            currentAlignment={alignment}
            setAlignment={setAlignment}
          />
        </div>
      ) : null}

      {!isGenerating ? (
        <input id="cover-upload" type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
      ) : null}
    </label>
  );
}

function AlignmentButton({alignment, currentAlignment, icon, setAlignment}) {
  return (
    <Button
      secondary
      onClick={(e) => {
        e.preventDefault();
        setAlignment(alignment);
      }}
      active={currentAlignment === alignment}
    >
      <FontAwesomeIcon icon={icon} rotation={90} />
    </Button>
  );
}
