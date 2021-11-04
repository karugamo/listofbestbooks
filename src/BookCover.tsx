import React, { useMemo } from "react";
import styled from "styled-components";

const borderRadius = `border-radius: 2px 6px 6px 2px;`;

export default function BookCover({
  children,
  rotate = 30,
  rotateHover = 5,
  perspective = 600,
  transitionDuration = 1,
  thickness = 50,
  bgColor = "#01060f",
  shadowColor = "#aaaaaa",
  width = 200,
  height = 300,
  pagesOffset = 3,
}: Props) {
  const uniqueId = useMemo(
    () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
    []
  );

  const settings = {
    rotate,
    rotateHover,
    perspective,
    transitionDuration,
    thickness,
    bgColor,
    shadowColor,
    width,
    height,
    pagesOffset,
  };

  return (
    <BookContainer settings={settings}>
      <Book settings={settings}>{children}</Book>
    </BookContainer>
  );
}

const BookContainer = styled.div<{ settings: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: ${({ settings }) => settings.perspective}px;
`;

const Book = styled.div<{ settings: any }>`
  width: ${({ settings }) => settings.width}px;
  height: ${({ settings }) => settings.height}px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(${({ settings }) => -settings.rotate}deg);
  transition: transform ${({ settings }) => settings.transitionDuration}s ease;

  &:hover {
    transform: rotateY(${({ settings }) => -settings.rotateHover}deg);
  }

  & > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ settings }) => settings.width}px;
    height: ${({ settings }) => settings.height}px;
    transform: translateZ(${({ settings }) => settings.thickness / 2}px);
    background-color: ${({ settings }) => settings.bgColor};
    ${borderRadius}
  }

  &:before {
    position: absolute;
    content: " ";
    left: 0;
    top: ${({ settings }) => settings.pagesOffset}px;
    width: ${({ settings }) => settings.thickness - 2}px;
    height: ${({ settings }) => settings.height - 2 * settings.pagesOffset}px;
    transform: translateX(
        ${({ settings }) =>
          settings.width - settings.thickness / 2 - settings.pagesOffset}px
      )
      rotateY(90deg);
    background: linear-gradient(
      90deg,
      #fff 0%,
      #f9f9f9 5%,
      #fff 10%,
      #f9f9f9 15%,
      #fff 20%,
      #f9f9f9 25%,
      #fff 30%,
      #f9f9f9 35%,
      #fff 40%,
      #f9f9f9 45%,
      #fff 50%,
      #f9f9f9 55%,
      #fff 60%,
      #f9f9f9 65%,
      #fff 70%,
      #f9f9f9 75%,
      #fff 80%,
      #f9f9f9 85%,
      #fff 90%,
      #f9f9f9 95%,
      #fff 100%
    );
  }

  & .back {
    position: absolute;
    top: 0;
    left: 0;
    content: " ";
    width: ${({ settings }) => settings.width}px;
    height: ${({ settings }) => settings.height}px;
    transform: translateZ(${({ settings }) => -settings.thickness / 2}px);
    background-color: ${({ settings }) => settings.bgColor};
    ${borderRadius}
  }
`;

interface Settings {
  /**
   * Rotation of the book, in degrees.
   */
  rotate: number;
  /**
   * Rotation of the book on hover, in degrees.
   */
  rotateHover: number;
  /**
   * Perspective value. 600 seems to be a realistic value.
   */
  perspective: number;
  /**
   * Duration of rotate animation, in milliseconds.
   */
  transitionDuration: number;
  /**
   * Book thickness, in pixels.
   */
  thickness: number;
  /**
   * Color of the inside of back cover.
   */
  bgColor: string;
  /**
   * Color of box shadow.
   */
  shadowColor: string;
  /**
   * Width of the book, in pixels.
   */
  width: number;
  /**
   * Height of the book, in pixels.
   */
  height: number;
  /**
   * Offset between the pages and the cover size, in pixels.
   */
  pagesOffset: number;
}

interface Props extends Partial<Settings> {
  children: React.ReactNode;
}
