import * as svgs from './SvgIcons';

export type Svg = keyof typeof svgs;

interface SvgIconProps {
	name: Svg;
	//className: Svg; 
}

export const SvgIcon: React.FC<SvgIconProps> = ({ name }) => {
	const Svg = svgs[name];
	return <Svg />;
};