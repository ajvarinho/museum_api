import * as svgs from './SvgIcons';

export type Svg = keyof typeof svgs;

interface SvgIconProps {
	name: Svg;
	className?: string; 
}

export const SvgIcon: React.FC<SvgIconProps> = ({ name, className }) => {
	const Svg = svgs[name];
	const combinedClassName = className ? `${name} ${className}` : name;
	return <Svg  />;
};