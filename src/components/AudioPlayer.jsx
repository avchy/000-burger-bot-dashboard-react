import * as React from "react";

import { MdPlayArrow, MdPause } from "react-icons/md";
import { Button, Box } from "@mui/material";

// const audioSrc = 'sound_long.mp3'
// const audioSrc = 'icq_sms_sound.mp3'
const audioSrc = "ringtone.wav";

export default function AudioPlayer(props) {
	const { volumeValueDataReceived } = props;

	const audioRef = React.useRef(null);

	const [isPlaying, setIsPlaying] = React.useState(false);
	const [volume, setVolume] = React.useState(0.2); // set to 0.2, max is 1.0

	React.useEffect(() => {
		handleVolumeChange(volumeValueDataReceived);
	}, [volumeValueDataReceived]);

	const handleVolumeChange = (volumeValue) => {
		if (!audioRef.current) return;
		audioRef.current.volume = volumeValue;
		setVolume(volumeValue);
	};

	const togglePlayPause = () => {
		if (isPlaying) {
			audioRef.current?.pause();
			setIsPlaying(false);
		} else {
			audioRef.current?.play();
			setIsPlaying(true);
			handleVolumeChange(0);
		}
	};

	return (
		<div>
			<audio
				loop
				ref={audioRef}
				preload="metadata"
				onPlaying={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
			>
				<track kind="captions" />
				<source type="audio/mpeg" src={audioSrc} />
			</audio>

			<div>
				<div>
					<Button
						onClick={togglePlayPause}
						aria-label={isPlaying ? "Pause" : "Play"}
						size="lg"
					>
						{isPlaying ? (
							<Box>
								<MdPause size={30} />
								mute
							</Box>
						) : (
							<Box>
								<MdPlayArrow size={30} />
								sound ON
							</Box>
						)}
					</Button>
				</div>

				<div>
					<VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
				</div>
			</div>
		</div>
	);
}

function VolumeInput(props) {
	const { volume, onVolumeChange } = props;
	return (
		<input
			aria-label="volume"
			name="volume"
			type="range"
			min={0}
			step={0.05}
			max={1}
			value={volume}
			className="w-[70px] m-0 h-2 rounded-full accent-cyan-600 bg-gray-700 appearance-none cursor-pointer"
			onChange={(e) => {
				onVolumeChange(e.currentTarget.valueAsNumber);
			}}
		/>
	);
}
