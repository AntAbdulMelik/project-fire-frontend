import { search, close } from "assets/media";

type Props = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  handleSearch: (input: string) => void;
};

const SearchBar = ({
  placeholder,
  value,
  onChange,
  onClick,
  handleSearch,
}: Props) => {
  return (
    <form
      className="relative"
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch(value);
      }}
    >
      <input
        className="h-10 w-[315px] rounded-sm border border-ashen-grey pl-[46px] font-inter-regular text-sm font-normal leading-[22px] text-charcoal-grey outline-none placeholder:font-inter-regular placeholder:text-sm placeholder:font-normal placeholder:leading-[22px] placeholder:text-charcoal-grey focus:border-ashen-grey focus:shadow-md focus:ring-transparent"
        type="text"
        id="search"
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <img
        className="absolute left-3 top-2 h-6 w-6 cursor-pointer"
        src={search}
        alt="Search icon"
      />
      {value && (
        <img
          className="absolute right-3 top-3 h-4 w-4"
          src={close}
          alt="Clear icon"
          onClick={onClick}
        />
      )}
    </form>
  );
};

export default SearchBar;
