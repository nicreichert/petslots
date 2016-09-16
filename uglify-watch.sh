#!/bin/bash

OUTPUT_FILE=js/scripts.min.js
INPUT_FILE=javascript/*.js
FILES=""
FILES_ARRAY=[]
TIMES_ARRAY=[]
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

COUNTER=0
for file in $INPUT_FILE
do
 FILES+=$file" "
 FILES_ARRAY[$COUNTER]=$file
 TIMES_ARRAY[$COUNTER]=$(stat -f%c $file)
 # echo ${FILES_ARRAY[$COUNTER]}
 # echo ${TIMES_ARRAY[$COUNTER]}
 ((COUNTER++))
done

Update() {
	FILE_CONTENT=$(uglifyjs $FILES -m)
	> $OUTPUT_FILE
	echo $FILE_CONTENT >> $OUTPUT_FILE
}

Update

while true    
do
	C=0
	CHANGED=false
	for file in "${FILES_ARRAY[@]}"
	do
		ATIME=$(stat -f%c $file)

		if [[ "$ATIME" != "${TIMES_ARRAY[$C]}" ]]
		then    
	   		TIMES_ARRAY[$C]=$ATIME
	   		printf "\t${GREEN}Changed${NC} $file\n"
	       	printf "\t${YELLOW}Update${NC} $OUTPUT_FILE\n"
			Update
		fi
		((C++))
   	done
   sleep 1
done
