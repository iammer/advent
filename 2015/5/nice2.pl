#!/usr/bin/perl

my $c = 0;
while(<>) {
	$c++ if (/(..).*\1/ && /(.).\1/);
}

print $c . "\n";

