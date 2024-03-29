import styles from './Select.module.css';

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_cotrol}>
      <label htmlFor={name}>{text}: </label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ''}
      >
        <option value="">Selecione uma opcao</option>
        {options.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
