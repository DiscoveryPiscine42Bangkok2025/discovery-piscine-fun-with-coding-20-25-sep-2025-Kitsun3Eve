# Check if any arguments were provided
if [ $# -eq 0 ]; then
  echo "No arguments"
  exit 1
fi
# Loop through all the arguments
for arg in "$@"; do
  # Prepend "ex" to the argument and create the directory
  mkdir "ex$arg"
done
