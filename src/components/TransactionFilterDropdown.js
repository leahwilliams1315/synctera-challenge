import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const TransactionFilterDropdown = ({options, selectedOption, onChange}) => (
  <FormControl style={{ minWidth: 270 }}>
    <InputLabel style={{color: 'white'}} id="filter-select">Filter by...</InputLabel>
    <Select
      style={{color: 'white'}}
      labelId="filter-select"
      value={selectedOption || ''}
      renderValue={() => selectedOption ? selectedOption.label : null}
      onChange={onChange}
    >
      { options.map(option => <MenuItem
        key={option.label}
        value={option}>{option.label}
        </MenuItem>)
      }
    </Select>
  </FormControl>
);

