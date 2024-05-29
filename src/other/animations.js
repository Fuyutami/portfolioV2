import { keyframes } from "styled-components"

export const skillsFlyIn = keyframes`
 0% {transform:translateX(-200%);}
  3.33% {transform:translateX(-170.059%);}
  6.67% {transform:translateX(-142.8439%);}
  10% {transform:translateX(-118.2344%);}
  13.33% {transform:translateX(-96.1106%);}
  16.67% {transform:translateX(-76.3523%);}
  20% {transform:translateX(-58.8396%);}
  23.33% {transform:translateX(-43.4522%);}
  26.67% {transform:translateX(-30.0702%);}
  30% {transform:translateX(-18.5735%);}
  33.33% {transform:translateX(-8.8421%);}
  36.67% {transform:translateX(-0.7557%);}
  40% {transform:translateX(5.8055%);}
  43.33% {transform:translateX(10.9617%);}
  46.67% {transform:translateX(14.8331%);}
  50% {transform:translateX(17.5395%);}
  53.33% {transform:translateX(19.2011%);}
  56.67% {transform:translateX(19.9381%);}
  60% {transform:translateX(19.8703%);}
  63.33% {transform:translateX(19.118%);}
  66.67% {transform:translateX(17.8012%);}
  70% {transform:translateX(16.0399%);}
  73.33% {transform:translateX(13.9543%);}
  76.67% {transform:translateX(11.6643%);}
  80% {transform:translateX(9.2901%);}
  83.33% {transform:translateX(6.9518%);}
  86.67% {transform:translateX(4.7693%);}
  90% {transform:translateX(2.8628%);}
  93.33% {transform:translateX(1.3524%);}
  96.67% {transform:translateX(0.3581%);}
  100% {transform:translateX(0%);}
`

export const skillsFlyOut = keyframes`
0% {transform:translateX(0%);}
  6.67% {transform:translateX(0.0316%);}
  13.33% {transform:translateX(0.5057%);}
  20% {transform:translateX(2.56%);}
  26.67% {transform:translateX(8.0909%);}
  33.33% {transform:translateX(19.7531%);}
  40% {transform:translateX(40.96%);}
  46.67% {transform:translateX(75.8835%);}
  53.33% {transform:translateX(129.4538%);}
  60% {transform:translateX(207.36%);}
  66.67% {transform:translateX(316.0494%);}
  73.33% {transform:translateX(462.7279%);}
  80% {transform:translateX(655.36%);}
  86.67% {transform:translateX(902.6686%);}
  93.33% {transform:translateX(1214.1353%);}
  100% {transform:translateX(1600%);}
`

export const skillsJumpRight = keyframes`
    0% {transform:translateX(0%);}
  6.67% {transform:translateX(28.5781%);}
  13.33% {transform:translateX(51.9447%);}
  20% {transform:translateX(70.5802%);}
  26.67% {transform:translateX(84.9649%);}
  33.33% {transform:translateX(95.579%);}
  40% {transform:translateX(102.9028%);}
  46.67% {transform:translateX(107.4165%);}
  53.33% {transform:translateX(109.6006%);}
  60% {transform:translateX(109.9352%);}
  66.67% {transform:translateX(108.9006%);}
  73.33% {transform:translateX(106.9771%);}
  80% {transform:translateX(104.6451%);}
  86.67% {transform:translateX(102.3847%);}
  93.33% {transform:translateX(100.6762%);}
  100% {transform:translateX(100%);}
`

export const skillsJumpLeft = keyframes`
   0% {transform:translateX(100%);}
  6.67% {transform:translateX(71.4219%);}
  13.33% {transform:translateX(48.0553%);}
  20% {transform:translateX(29.4198%);}
  26.67% {transform:translateX(15.0351%);}
  33.33% {transform:translateX(4.421%);}
  40% {transform:translateX(-2.9028%);}
  46.67% {transform:translateX(-7.4165%);}
  53.33% {transform:translateX(-9.6006%);}
  60% {transform:translateX(-9.9352%);}
  66.67% {transform:translateX(-8.9006%);}
  73.33% {transform:translateX(-6.9771%);}
  80% {transform:translateX(-4.6451%);}
  86.67% {transform:translateX(-2.3847%);}
  93.33% {transform:translateX(-0.6762%);}
  100% {transform:translateX(0%);}
`

export const bouncyAppear = keyframes`
   0% {transform:scale(0);}
  6.67% {transform:scale(0.03361111111111111);}
  13.33% {transform:scale(0.13444444444444445);}
  20% {transform:scale(0.30250000000000005);}
  26.67% {transform:scale(0.5377777777777778);}
  33.33% {transform:scale(0.8402777777777779);}
  40% {transform:scale(0.9099999999999998);}
  46.67% {transform:scale(0.7969444444444443);}
  53.33% {transform:scale(0.7511111111111111);}
  60% {transform:scale(0.7725);}
  66.67% {transform:scale(0.8611111111111113);}
  73.33% {transform:scale(0.9919444444444444);}
  80% {transform:scale(0.94);}
  86.67% {transform:scale(0.9552777777777778);}
  93.33% {transform:scale(0.9877777777777778);}
  100% {transform:scale(1);}
`

export const blinkEnter1 = keyframes`
		0% {
		opacity: 0;
	}
	10% {
		opacity: 0.5;
	}
	20%{
		opacity: 1;
	}

	30% {
		opacity: .5;
	}
	40% {
		opacity: 0;
	}
	50% {
		opacity: 0.5;
	}
	60% {
		opacity: 1;
	}
	70% {
		opacity: .5;
	}
	80% {
		opacity: 0;
	}
	90% {
		opacity: .5;
	}
	100% {
		opacity: 1;
	}

`
export const blinkEnter2 = keyframes`
	0% {
		opacity: 0;
	}
	20%{
		opacity: 0.5;
	}

	30% {
		opacity: 1;
	}
	40% {
		opacity: 0.5;
	}
	50% {
		opacity: 0;
	}
	60% {
		opacity: 0.5;
	}
	70% {
		opacity: 1;
	}
	100% {
		opacity: 1;
	}

`
export const blinkExit = keyframes`
	0%{
		opacity: 1;
	}
	20% {
		opacity: .5;
	}
	50%{
		opacity: 1;
	}
	80% {
		opacity: .5;
	}
	100% {
		opacity: 0;

	}
`

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`
